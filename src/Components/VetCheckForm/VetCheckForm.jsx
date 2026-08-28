import {useState} from "react";
import "./VetCheckForm.scss";

const VetCheckForm = ({petId, onVetCheckAdded, onCancel}) => {

    //Form data
    const [formData, setFormData] = useState({
        date: "",
        reason: "",
        notes: "",
        nextAppointment: "",
    });

    const [saving, setSaving] = useState(false);

    //Handle form change
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    //Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.date || !formData.reason) {
            return;
        }

        setSaving(true);

        try {
            //Get selected pet from backend
            const petResponse = await fetch(`http://localhost:3000/pets/${petId}`);

            if (!petResponse.ok) {
                throw new Error("Could not find pet");
            }

            const pet = await petResponse.json();

            //Creat new vet check
            const newVetCheck = {
                id: Date.now().toString(),
                date: formData.date,
                reason: formData.reason,
                notes: formData.notes,
                nextAppointment: formData.nextAppointment,
            };

            const updatePet = {
                ...pet,
                vetChecks: [...(pet.vetChecks || []), newVetCheck],
            };

            //Save updated pet to backend
            const response = await fetch(`http://localhost:3000/pets/${petId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatePet),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save vet check");
            }

            const savedPet = await response.json();

            onVetCheckAdded(savedPet);

            //Reset form
            setFormData({
                date: "",
                reason: "",
                notes: "",
                nextAppointment: "",
            });
        } catch (error) {
            console.error("Error saving vet check", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="vet-check-form">
            <div className="vet-check-form__header">
                <div>
                    <h4>Add Vet Check</h4>
                    <p>Record a veterinary visit.</p>
                </div>

                <button
                    type="button"
                    className="vet-check-form__close"
                    onClick={onCancel}
                >
                    x
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="vet-check-form__group">
                    <label htmlFor="vet-date">Date</label>

                    <input
                        id="vet-date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="vet-check-form__group">
                    <label htmlFor="vet-reason">Reason / Check-Up</label>

                    <input
                        id="vet-reason"
                        name="reason"
                        type="text"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Annual check-up"
                        required
                    />
                </div>

                <div className="vet-check-form__group">
                    <label htmlFor="vet-notes">Vet Notes</label>

                    <textarea
                        id="vet-notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="What did the vet say?"
                        rows="3"
                    />
                </div>

                <div className="vet-check-form__group">
                    <label htmlFor="next-appointment">Next Appointment</label>

                    <input
                        id="next-appointment"
                        name="nextAppointment"
                        type="date"
                        value={formData.nextAppointment}
                        onChange={handleChange}
                    />
                </div>

                <div className="vet-check-form__actions">
                    <button
                        type="button"
                        className="vet-check-form__cancel"
                        onClick={onCancel}
                    >Cancel</button>

                    <button
                        type="submit"
                        className="vet-check-form__save"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Vet Check"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VetCheckForm;