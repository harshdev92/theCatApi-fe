type CatProps = {
    name: string
    id: string
    url: string
    width: number
    height: number
    breeds: Array<Breed>
    categories: Array<Category>
}

type Breed = {
    id: string
    name: string
    temperament: string
    origin: string
    life_span: string
}

type Category = {
    id: number
    name: string
}

const CatGallery = ({ cats }: any) => (
    <section className="overflow-hidden text-gray-700 ">
        <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
                {cats.map((cat: CatProps) => (
                    <div className="flex flex-wrap w-1/3" key={cat.id}>
                        <div className="w-full p-1 md:p-2">
                            <img
                                className="block object-cover object-center w-full h-full rounded-lg"
                                src={cat.url}
                                alt={cat.id}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export default CatGallery
