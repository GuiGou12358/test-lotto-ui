import React, { useState } from 'react';
import {useQuery, gql, ApolloClient, InMemoryCache, useApolloClient} from '@apollo/client';

// Define your GraphQL query
const QUERY = gql`
    query{      
      winners(orderBy: NUM_RAFFLE_DESC){
        nodes{numRaffle, accountId}
      }
  }
`;


// Component to display the fetched data in a table with filterable headers
const WinnersHistory: React.FC = () => {
    // Execute the GraphQL query

    const { loading, error, data } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Winners</h2>
            <table>
                <thead>
                <tr>
                    <th style={{width: '10%'}}>
                        Raffle
                    </th>
                    <th style={{width: '20%'}}>
                        Address
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.winners.nodes.map((winner: any) => (
                    <tr key={winner.numRaffle}>
                        <td>{winner.numRaffle}</td>
                        <td>{winner.accountId}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WinnersHistory;

