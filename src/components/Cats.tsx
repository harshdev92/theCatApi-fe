import react, {useState, useEffect} from 'react';
import { getCats } from '../services/catServices';


type Cat    = {
    name: string;
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: Array<Breed>;
    categories: Array<Category>;
}

type Breed  = {
    id: string;
    name: string;
    temperament: string;
    origin: string;
    life_span: string;
}

type Category = {
    id: number;
    name: string;
}

const Cats = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getCats().then((response) => {
            setCats(response.data);
            setLoading(false);
        });
        

    }, []);

    return (
        <div className="container">
            <div className="grid grid-cols-3 gap-4">
                {loading ? (
                    <div className="text-2xl font-bold text-center">Loading...</div>
                ) : (
                    cats.map((cat: Cat) => (
                        <div key={cat.id} className="border border-gray-400 rounded-lg overflow-hidden">
                            <img src={cat.url} alt={cat.id} width={cat.width} height={cat.height}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cats;
