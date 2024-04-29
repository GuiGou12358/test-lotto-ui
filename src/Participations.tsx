import React, { useState } from 'react';
import {useQuery, gql, ApolloClient, InMemoryCache, useApolloClient} from '@apollo/client';

// Define your GraphQL query
const QUERY = gql`
    query GetParticipations($numRaffle: BigFloat, $accountId: String){      
      participations(filter: {and: [{numRaffle: {equalTo: $numRaffle}}, {accountId: {equalTo: $accountId}}]}){
        nodes{accountId, numRaffle, numbers}
      }  
    }
`;


// Component to display the fetched data in a table with filterable headers
const ParticipationsHistory: React.FC = () => {
    // Execute the GraphQL query

    let rowId = 1;

    const [numRaffle, setNumRaffle] = useState("10");
    const [accountId, setAccountId] = useState('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');

    const { loading, error, data } = useQuery(QUERY, {
        variables: { numRaffle, accountId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Participations</h2>
            <table>
                <thead>
                <tr>
                    <th style={{width: '10%'}}>
                        Raffle
                    </th>
                    <th style={{width: '50%'}}>
                        Address
                    </th>
                    <th style={{width: '20%'}}>
                        Numbers
                    </th>
                </tr>
                <tr>
                    <th>
                        <input
                            type="text"
                            placeholder="Filter by Raffle"
                            value={numRaffle}
                            onChange={(e) => setNumRaffle(e.target.value)}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Filter by Address"
                            value={accountId}
                            onChange={(e) => setAccountId(e.target.value)}
                        />
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.participations.nodes.map((participation: any) => (
                    <tr key={rowId++}>
                        <td>{participation.numRaffle}</td>
                        <td>{participation.accountId}</td>
                        <td>{participation.numbers.join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipationsHistory;

