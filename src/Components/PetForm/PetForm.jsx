import {useState} from "react";

import "./PetForm.scss";

const PetForm = ({onPetAdded}) => {
    const [formData, setFormData] = useState({
        name: "",
        species: "",
        breed: "",
        dateOfBirth: "",
        notes: "",
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.species) {
            return;
        }

        setSaving(true);

        try {
            const pet = {
                name: formData.name,
                species: formData.species,
                breed: formData.breed,
                dateOfBirth: formData.dateOfBirth,
                notes: formData.notes,
                vetChecks: [],
            };

            const response = await fetch(
                "http://localhost:3000/pets",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(pet),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add pet");
            }

            const newPet = await response.json();

            onPetAdded(newPet);

            setFormData({
                name: "",
                species: "",
                breed: "",
                dateOfBirth: "",
                notes: "",
            });
        } catch (error) {
            console.error("Error adding pet",error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="pet-form">

            <div className="pet-form__header">
                <h2>Add a Pet</h2>
                <p>Add a new pet to your ledger</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="pet-form__group">
                    <label htmlFor="name">Pet Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Puhek"
                        required
                    />
                </div>

                <div className="pet-form__group">
                    <label htmlFor="species">Species</label>
                    <select
                        id="species"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select species</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="pet-form__group">
                    <label htmlFor="breed">Breed</label>
                    <input
                        id="breed"
                        name="breed"
                        type="text"
                        value={formData.breed}
                        onChange={handleChange}
                        placeholder="Mixed"
                    />
                </div>

                <div className="pet-form__group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <div className="pet-form__group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Add a note about you pet..."
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}>
                    {saving ? "Adding..." : "Add Pet"}
                </button>

            </form>

        </section>
    )
};

export default PetForm;