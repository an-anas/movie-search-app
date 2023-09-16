import style from './style.module.css';

export const SearchView = () => {
    return (
        <>
            <div className={style.header}>TMSE: The Movie Search Engine</div>
            <hr />
            <div className={style.searchBar}>
                <input type="text" placeholder="Search for a movie" />
            </div>
        </>
    );
}