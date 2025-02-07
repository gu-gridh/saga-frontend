export type Item = {
    title: string;
    altTitles: AltTitle[];
    publisher: [Publisher];
    children: any;
}

interface AltTitle {
    '@value': AltTitleValue;
}

interface AltTitleValue {
    '@value': string;
}

export type Publisher = {
    display_title: string;
}

export type Contributor = {
    id: string;
    title: string;
}

export type Organisation = {
    title: string;
    dateOfEstablishment: string;
    contributors: Contributor[];
    altLabels: string[];
}