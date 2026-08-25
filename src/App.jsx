import 'sass-reset';

import {useEffect, useState} from "react";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import PetForm from "./Components/PetForm/PetForm.jsx";
import PetList from "./Components/PetList/PetList.jsx";
import "./App.scss";

const App = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            void fetchPets();
        }, []);

    const fetchPets = async () => {
        try {
            const response = await fetch("http://localhost:3000/pets");
            if (!response.ok) throw new Error("Failed to fetch pets.");
            setPets(await response.json());
        } catch (error) {
            console.error("Error fetching pets:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePetAdded = (newPet) => {
        setPets((previousPets) => [...previousPets, newPet]);
    };

    const handlePetUpdated = (updatedPet) => {
        setPets((previousPets) =>
            previousPets.map((pet) =>
                pet.id === updatedPet.id ? updatedPet : pet
            )
        );
    };

    return (
        <>
            <Header />

            <main className="app">
                <div className="app__container">
                    <div className="app__intro">
                        <h1>Pet Ledger</h1>
                        <p>Keep track of your pets and their veterinary history.</p>
                    </div>

                    <div className="app__layout">
                        <PetForm onPetAdded={handlePetAdded} />

                        {loading ? (
                            <div className="app__loading">Loading pets...</div>
                        ) : (
                            <PetList pets={pets} onPetUpdated={handlePetUpdated} />
                        )}
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    );
};

export default App;
