
async function getPosts()
{
    const req = await fetch(`${process.env.GARCHI_API_URL}/items/filter`, {
      body: JSON.stringify({
        categories: [99]
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
  
  export default async function BlogList() {
    const posts = await getPosts()
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.data.map((post: any) => (
              <article key={post.id} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    src={post.main_image}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">

                    {
                        post.categories.map((category: any) => (  <a
                            href="#"
                            key={category.id}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {category.name}
                          </a>))
                    } 
                  
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={post.slug}>
                        <span className="absolute inset-0" />
                        {post.name}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.one_liner}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span>
                          <span className="absolute inset-0" />
                          {post.item_meta.find((meta: any) => meta.key === 'Author').value}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  