import {useState} from "react";
import VetCheckForm from "../VetCheckForm/VetCheckForm.jsx";
import "./PetCard.scss";

const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
        return null;
    }

    const birthDate = new Date(`${dateOfBirth}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
};

const formatDate = (date) => {
    if (!date) {
        return "Not specified";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString();
};

const PetCard = ({ pet, onPetUpdated }) => {
    const [showVetForm, setShowVetForm] = useState(false);

    const age = calculateAge(pet.dateOfBirth);

    const handleVetCheckAdded = (updatedPet) => {
        onPetUpdated(updatedPet);
        setShowVetForm(false);
    };

    return (
        <article className="pet-card">
            <div className="pet-card__top">
                <div>
                    <h3>{pet.name}</h3>
                    <span className="pet-card__species">{pet.species}</span>
                </div>

                {age !== null && (
                    <div className="pet-card__age">
                        <strong>{age}</strong>
                        <span>{age === 1 ? "year" : "years"}</span>
                    </div>
                )}
            </div>

            <div className="pet-card__details">
                <div className="pet-card__detail">
                    <span>Breed</span>
                    <strong>{pet.breed || "Not specified"}</strong>
                </div>

                <div className="pet-card__detail">
                    <span>Date of Birth</span>
                    <strong>{formatDate(pet.dateOfBirth)}</strong>
                </div>
            </div>

            <div className="pet-card__section">
                <div className="pet-card__section-title">Notes</div>
                <p>{pet.notes || "No notes added"}</p>
            </div>

            <div className="pet-card__section">
                <div className="pet-card__section-header">
                    <div className="pet-card__section-title">Vet Checks</div>

                    <button
                        type="button"
                        className="pet-card__add-button"
                        onClick={() => setShowVetForm(!showVetForm)}
                    >
                        {showVetForm ? "Close" : "+ Add Vet Check"}
                    </button>
                </div>

                {pet.vetChecks && pet.vetChecks.length > 0 ? (
                    <div className="pet-card__checks">
                        {pet.vetChecks.slice().reverse().map((check) => (
                            <div className="pet-card__check" key={check.id}>
                                <div className="pet-card__check-top">
                                    <strong>{check.reason}</strong>
                                    <span>{formatDate(check.date)}</span>
                                </div>

                                {check.notes && <p>{check.notes}</p>}

                                {check.nextAppointment && (
                                    <small>
                                        Next appointment: {formatDate(check.nextAppointment)}
                                    </small>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="pet-card__no-checks">No vet checks recorded</p>
                )}

                {showVetForm && (
                    <VetCheckForm
                        petId={pet.id}
                        onVetCheckAdded={handleVetCheckAdded}
                        onCancel={() => setShowVetForm(false)}
                    />
                )}
            </div>
        </article>
    );
};

export default PetCard;