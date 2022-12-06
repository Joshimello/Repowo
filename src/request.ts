import query from './query.ts'

let token = import.meta.env.VITE_GITHUBTOKEN
console.log(token)

export default username => {
    return new Promise((resolve, reject) => {
        fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify({
                query, 
                variables: { login: username }
            })
        })
        .then(r => r.json())
        .then(data => {
            resolve(data.data.user.repositories.nodes.map(i => {
                return {
                    'name': i.name,
                    'lang': i.languages.edges.map(i => {
                        return {
                            'name': i.node.name,
                            'size': i.size,
                            'color': i.node.color
                        }
                    })
                }
            }))
        })
    })
}