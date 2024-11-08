import { useEffect, useState } from 'react'

function App() {
  const [searchResults, setSearchResults] = useState([])

  return (
    <>
      <h1>GitHub Search</h1>
      <SearchInput setSearchResults={setSearchResults} />
      <SearchResults results={searchResults} />
    </>
  )
}

function SearchInput(props) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const url = `https://api.github.com/search/repositories?q=example`;
    fetch(url).then(response => {
      if (!response.ok) {
        alert("Search failed")
      } else {
        return response.json();
      }
    }).then(data => {
      props.setSearchResults(data.items)
    })
  }, [])

  function handleChange(e) {
    setQuery(e.target.value)
  }

  function handleSearch(e) {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    fetch(url).then(response => {
      if (!response.ok) {
        alert("Search failed")
      } else {
        return response.json();
      }
    }).then(data => {
      props.setSearchResults(data.items)
    })
  }

  return (
    <div>
      <p>Current query: {query}</p>
      <input type="text" value={query} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

function SearchResults(props) {
  return (
    <div>
      <h2>Search results</h2>
      <ol>
        {props.results.map(item => {
          return <li key={item.id}>{item.full_name}</li>
        })}
      </ol>
    </div>
  )
}


export default App
