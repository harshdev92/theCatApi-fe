type UnFavoriteIconProps = {
    width?: string
    height?: string
    handleCatUnFavourite: (id: string) => void
    id: string
}

const UnFavouriteIcon = ({ handleCatUnFavourite, id }: UnFavoriteIconProps) => (
    <button
        onClick={() => handleCatUnFavourite(id)}
        type="button"
        className="inline-flex items-center h-6 ml-3 py-2 px-2 text-sm font-medium text-gray-900 bg-transparent rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    </button>
)

export default UnFavouriteIcon
