// Interfaces for the API data collected from https://developer.themoviedb.org/reference/movie-credits

export interface CastMember {
    "adult": boolean;
    "gender": number;
    "id": number;
    "known_for_department": string;
    "name": string;
    "title": string;
    "original_name": string;
    "popularity": number;
    "profile_path": string;
    "poster_path": string;
    "cast_id": number;
    "character": string;
    "credit_id": string;
    "order": number;
}

export interface CrewMember {
    "adult": boolean;
    "gender": number;
    "id": number;
    "known_for_department": string;
    "original_name": string;
    "name": string;
    "title": string;
    "popularity": number;
    "profile_path": string;
    "poster_path": string;
    "cast_id": number;
    "character": string;
    "credit_id": string;
    "department": string;
    "job": string;
    "order": number;
}

export interface Credits {
    cast: CastMember[],
    crew: CrewMember[]
}
