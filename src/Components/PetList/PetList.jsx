import PetCard from "../PetCard/PetCard.jsx";
import "./PetList.scss";

const PetList = ({pets, onPetUpdated}) => {
    return (
        <section className="pet-list">
            <div className="pet-list__header">
                <div>
                    <h2>Pets</h2>
                    <p>Your registered pets</p>
                </div>

                <span className="pet-list__count">{pets.length}</span>
            </div>

            {pets.length === 0 ? (
                <div className="pet-list__empty">
                    <h3>No pets yet</h3>
                    <p>Add your first pet using the form.</p>
                </div>
            ) : (
                <div className="pet-list__grid">
                    {pets.map((pet) => (
                        <PetCard
                            key={pet.id}
                            pet={pet}
                            onPetUpdated={onPetUpdated}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default PetList;