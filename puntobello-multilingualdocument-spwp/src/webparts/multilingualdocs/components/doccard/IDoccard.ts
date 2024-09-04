import { IDocumentCardPreviewProps } from '@fluentui/react/lib/DocumentCard';

import { IRelatedDoc } from '../../models/IRelatedDoc';

export interface IDoccard {
  preview: IDocumentCardPreviewProps;
  targetUrl: string;
  activity: string;
  title: string;
  desc: string;
  relatedDocs: IRelatedDoc[];
  language: string;
}

