export interface CarteleraResponse {
    page:          number;
    dates:         Dates;
    total_results: number;
    total_pages:   number;
    results:       Movie[];
}

export interface Dates {
    minimum: Date;
    maximum: Date;
}

export interface Movie {
    title:             string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    poster_path:       string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    release_date:      Date;
    overview:          string;
    popularity:        number;
    adult:             boolean;
    backdrop_path:     string;
}
