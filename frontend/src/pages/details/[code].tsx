import NotFound from "@/components/NotFound"
import { useGetCountryQuery } from "@/generated/graphql-types"
import { useRouter } from "next/router"

export default function CountryDetail() {
  const router = useRouter()

  const { error, data, loading } = useGetCountryQuery({
    variables: {
      code: router.query.code as string,
    },
  })

  if (error) return <NotFound />
  if (loading) return <p>Loading...</p>
  if (data)
    return (
      <div className="m-4 flex flex-col justify-center items-center gap-2 lg:w-2/3 lg:mx-auto">
        <h2 className="text-7xl">{data.country.emoji}</h2>
        <p>
          Name : {data.country.name} ({data.country.code})
        </p>
        {data.country.continent && (
          <p>Continent : {data.country.continent?.name}</p>
        )}
      </div>
    )
}
