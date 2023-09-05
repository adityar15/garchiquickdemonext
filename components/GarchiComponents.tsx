import dynamic from "next/dynamic"

export type Section  = {
    id: String
    name: String
    props: {
        [key: string]: any
    }
    children: Section[]
    order: Number
}

type Props = {
    section: Section
}


export default function GarchiComponent({
    section
}: Props){

    if(!section) return null

    const Component = dynamic(() => import(`./${section.name}`))

    let props = section.children.length > 0 ? {
        subSection: section.children,
        ...section.props
    } : section.props

    return (
        <Component {...props}  />
    )
}