export type Item = {
    title: string;
    altTitles: AltTitle[];
    publisher: [Publisher];
    children: [
        {
            'o:title': string;
            'o:id': string;
        }
    ];
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

export type ReverseItem = {
    'o:id': number;
    'o:title': string;
  }
  
export type SagaVerk = {
    'o:id': number;
    'bibo:number': Array<{
        '@value': number;
    }>
    'o:title': string;
    'thumbnail_display_urls': {
      'large': string;
      'medium': string;
    };
    '@reverse': {
      'dcterms:isPartOf': ReverseItem[];
    };
    'dcterms:issued': {
        '@value': string | number;
    }
    '@value': string;
  }

export type SagaSerie = {
    id: number;
    title: string;
    isPartOf: {
        id: string;
        'o:title': string;
    }[];
};