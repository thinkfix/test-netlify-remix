import { useNavigate } from '@remix-run/react'

export default function GoBack() {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    return (
        <button onClick={goBack} className={"px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white"}>go back</button>
    )
}
