import React, { useState } from 'react';
import {useQuery, gql, ApolloClient, InMemoryCache, useApolloClient} from '@apollo/client';

// Define your GraphQL query
const QUERY = gql`
    query {      
      results(orderBy: NUM_RAFFLE_DESC){
        nodes{numRaffle, numbers}
      }  
    }
`;


// Component to display the fetched data in a table with filterable headers
const ResultsHistory: React.FC = () => {
    // Execute the GraphQL query

    const { loading, error, data } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Results</h2>
            <table>
                <thead>
                <tr>
                    <th style={{width: '10%'}}>
                        Raffle
                    </th>
                    <th style={{width: '20%'}}>
                        Numbers
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.results.nodes.map((result: any) => (
                    <tr key={result.numRaffle}>
                        <td>{result.numRaffle}</td>
                        <td>{result.numbers.join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsHistory;

