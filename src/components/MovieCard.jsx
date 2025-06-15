import React from 'react'

function MovieCard({ movie: { title, vote_average, poster_path, release_date, original_language } }) {
    const IMG_POINT = import.meta.env.VITE_IMG_POINT;
    const SEPARATOR_SYM = "|";
    return (
        <div className='movie-card'>
            <img src={poster_path ? `${IMG_POINT}/${poster_path}` : `/No-Poster.png`} alt={title}></img>
            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src='/Rating.svg' alt='Star Icon'></img>
                        <p>{vote_average ? vote_average.toFixed(1) : "No Rating"}</p>
                    </div>
                    <span>{SEPARATOR_SYM}</span>
                    <p className='lang'>{original_language ? original_language : "Na"}</p>
                    <span>{SEPARATOR_SYM}</span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'Na'}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard