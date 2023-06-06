export default function Search(props) {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        placeholder="Search Movies"
        value={props.value}
        onChange={(e) => 
                    {
                      props.setPage(1);
                      props.setMovies([]);
                      props.setSearchInput(e.target.value);
                    }
                  }
      />
    </div>
  );
}
