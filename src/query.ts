export default `
    query userInfo($login: String!) {
        user(login: $login) {
            repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
                nodes {
                    name
                    languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
                        edges {
                            size
                            node {
                                color
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`