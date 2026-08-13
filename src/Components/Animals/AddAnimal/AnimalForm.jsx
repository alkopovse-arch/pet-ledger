const AnimalForm = () => {
    return (
        <div className="pet-form-container">
            <from className="pet-form">
                <h2>Add Pet</h2>

                <div className="form-group">
                    <label>Pet Name</label>
                    <input
                    type="text"
                    name="name"
                    value={pet.name}/>
                    onChange
                </div>
            </from>
        </div>
    )
}