import Header from "@/components/Header";
import { fetchAllThemes } from "@/lib/api";

interface Props {
  params: any;  // or literal union type
}


export default async function Test({ params }: Props) {
    const { status } = params;

    console.log('params', params);


    return (
        <><div>hi : {params.id}</div></>
    );
    }

