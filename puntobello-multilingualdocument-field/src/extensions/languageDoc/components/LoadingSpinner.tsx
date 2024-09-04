import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import styles from './LanguageDoc.module.scss';

export default function LoadingSpinner() {
    return (
    <Spinner size={SpinnerSize.xSmall} className={styles.spinner} />
    )
}