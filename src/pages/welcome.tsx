
import { useSearchParams } from "next/navigation";

export default function WelcomePage(){

    const searchParams = useSearchParams()
    const name = searchParams.get('name');
    
    return(
        <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">Hi, {name}!</div>
    )
}