
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../Api/favApi";
import ProductCard from "../components/ProductCard";
import { FaArrowLeft } from "react-icons/fa";

const Favourite = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                navigate("/login");
                return;
            }

            try {
                const favToys = await getFavorites(userId);
                setFavorites(favToys);
            } catch (error) {
                console.error("Failed to fetch favorites", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen ">
            <header className=" bg-white shadow-lg px-15 py-3  flex flex-wrap gap-6 justify-between items-center sticky top-0 z-20 rounded-b-md">
                <h1 className="text-3xl font-extrabold text-amber-900 tracking-wider">
                    ToyCycle
                </h1>

            </header>
            {/* Back Button */}
            <div className="px-15 py-3 mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-amber-950 hover:text-amber-700 transition duration-200 text-lg"
                >
                    <FaArrowLeft className="mr-2" /> Go Back
                </button>
            </div>
            <h2 className="text-3xl font-semibold text-center text-amber-950 ">
                Favourite Toys
            </h2>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-600 italic">No favorites added yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-10 py-5">
                    {favorites.map((toy) => (
                        <ProductCard key={toy._id} product={toy} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourite;
