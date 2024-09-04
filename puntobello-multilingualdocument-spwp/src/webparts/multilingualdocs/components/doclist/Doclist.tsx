// React imports
import * as React from 'react';

// Fluent UI imports
import { DetailsList, SelectionMode } from '@fluentui/react';

// File type icons initialization
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';

// Utility functions and helper methods
import { Utility, getColumns, getKey, onRenderRow } from '../../utils';

// Component-specific types and interfaces
import { IDoclist } from '.';

// Initialize icons for document types
initializeFileTypeIcons(undefined);

export default function Doclist(props: IDoclist) {
  // Destructuring props to extract docdata and language
  const {
    docdata,
    language
  } = props;

  // Memoizing the columns based on the current language to avoid unnecessary re-renders
  const columns = React.useMemo(() => getColumns(language), [language]);

  // Recreating the docdata array by destructuring it.
  // This is crucial because the DetailsList component has its own performance optimization
  // that can prevent re-rendering when values change if the array reference remains the same.
  const items = [...docdata];

  return (
    <DetailsList
      items={items} 
      onRenderRow={onRenderRow} 
      columns={columns} 
      selectionMode={SelectionMode.none} 
      getKey={getKey} 
      setKey="none" 
      isHeaderVisible={true} 
      ariaLabel={Utility.getStringTranslation4Locale('DocListLabel', language)} 
      ariaLabelForListHeader={Utility.getStringTranslation4Locale('DocListHeaderLabel', language)} 
    />
  );
}
