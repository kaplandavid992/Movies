export default function Search(props){
    return (
        <div className="col col-sm-4">
          
                <input className="form-control"
                    placeholder="Search Movies"
                    value={props.value}
                    onChange={(e) => 
                                props.setSearchInput(e.target.value)}
                />
               
          
        </div>
    )
}