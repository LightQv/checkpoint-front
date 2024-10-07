import React from "react"
import { useGetAllCountriesQuery } from "@/generated/graphql-types"
import CountryCard from "./countries/CountryCard"
import NotFound from "./NotFound"
import CountryForm from "./countries/CountryForm"

export default function Countries() {
  const { error, data, loading } = useGetAllCountriesQuery()

  if (error) return <NotFound />
  return (
    <div className="m-4 space-y-4 lg:w-2/3 lg:mx-auto">
      <section>
        <CountryForm />
      </section>
      <section>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid grid-cols-3 gap-2 lg:grid-cols-6">
            {data &&
              data.countries.map((country) => (
                <CountryCard
                  key={country.id}
                  title={country.name}
                  emoji={country.emoji}
                  code={country.code}
                />
              ))}
          </ul>
        )}
      </section>
    </div>
  )
}
