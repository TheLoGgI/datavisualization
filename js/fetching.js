
class GetData {
    constructor() {
        this.data = null
        this.errors = null
        this.response = null
    }

    async fetching(path) {

        const options = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        try {
            const response = await fetch(path, options)
            this.data = await response.json()
            this.response = 200

        }
        catch(error) {
            this.error = error
            this.response = 404
            console.error(error);
        }

        return this
    }

    sorting(sortingProp) {
        const sortedData = new Map()
        
        for (const area of this.data) {
            if (sortedData.has(area[sortingProp])){
                const keyData = sortedData.get(area[sortingProp])
                sortedData.set(area[sortingProp], {
                    anzsic06: keyData.anzsic06,
                    ec_count: [...keyData.ec_count, area.ec_count],
                    geo_count: [...keyData.geo_count, area.geo_count]
                })

            } else {
                sortedData.set(area[sortingProp], {
                    anzsic06: area.anzsic06,
                    ec_count: [area.ec_count],
                    geo_count: [area.geo_count]
                })
                
            }
            
        }

        return sortedData.entries()
    }
}