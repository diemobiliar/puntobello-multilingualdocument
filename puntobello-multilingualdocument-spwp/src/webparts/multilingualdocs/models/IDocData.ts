import { IRelatedDoc } from './IRelatedDoc';
import { IDocumentCardPreviewProps } from '@fluentui/react/lib/DocumentCard';

export interface IDocData {
    preview: IDocumentCardPreviewProps;
    relatedDocs: IRelatedDoc[];
    targetUrl: string;
    lastActivity: string;
    docTitle: string;
    docDesc: string;
    iconName: string;
    fileType?: string;
    sortOrder?: number;
}
  
  