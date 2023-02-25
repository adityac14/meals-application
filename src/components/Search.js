import { useState } from "react"
import { useGlobalContext } from "../Context"

const Search = () => {
    return <header className="search-container">
        <form>
            <input type="text" placeholder="Type Favourite Meal" className="form-input"/>
            <button type="submit" className="btn">Search</button>
            <button type="button" className="btn btn-hipster">Surprise Me!</button>
        </form>
    </header>

}

export default Search