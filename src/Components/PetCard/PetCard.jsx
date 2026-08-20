import {useState} from "react";
import VetCheckForm from "../VetCheckForm/VetCheckForm.jsx";
import "./PetCard.scss";

const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;

    const birthDate = new Date(`${dateOfBirth}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
};

const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(`${date}T00:00:00`).toLocaleDateString();
};

const PetCard = ({ pet, onPetUpdated}) => {
    const [showVetForm, setShowVetForm] = useState(false);

    const age = calculateAge(pet.dateOfBirth);

    const handleVetCheckAdded = (updatedPet) => {
        onPetUpdated(updatedPet);
        setShowVetForm(false);
    };

    return (
        <div className="pet-card">
            <h2>{pet.name}</h2>

            <p>Species: {pet.species}</p>
            <p>Breed: {pet.breed || "Not specified"}</p>
            <p>Date of birth: {formatDate(pet.dateOfBirth)}</p>
            <p>Age: {age !== null ? age : "Not specified"}</p>

            <button onClick={() => setShowVetForm(true)}>
                Add Vet Check
            </button>

            {showVetForm && (
                <VetCheckForm
                    pet={pet}
                    onVetCheckAdded={handleVetCheckAdded}
                    onCancel={() => setShowVetForm(false)}
                />
            )}
        </div>
    );
};

export default PetCard;