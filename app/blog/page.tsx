import BlogList from '@/components/BlogList'
import GarchiComponent, { Section } from '@/components/GarchiComponents'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

async function getGarchiPage(){
    const req = await fetch(`${process.env.GARCHI_API_URL}/page`, {
      body: JSON.stringify({
        mode: "draft",
        slug: "/blog",
        space_uid: "62931923-b209-4e5c-9b91-57065cb443d279df607f-3026-45de-b684-5bee"
      }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GARCHI_API_KEY}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    })

    const res = await req.json()
   
    return res
}

export async function generateMetadata(): Promise<Metadata> {
    // read route params
    const page = await getGarchiPage()
   
    return {
      title: page.title,
      description: page.description,
    }
}

export default async function Blog({}: Props) {

  const page = await getGarchiPage()


  return (
    <div className="bg-white">
        {page.sections.map((section : Section) => <GarchiComponent section={section} />)}
    </div>
  )
}