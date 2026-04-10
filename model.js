const model = {
    app: {
        app: document.getElementById("app"),
    },
    viewState: {

    },
    data: {
        missions: {
            currentMission: "Get Food and Water",
            allMissions: ["Get Food and Water", "Build Campfire", "Place Campfire", "Build Shelter", "Build Bed", "Sleep through the night"],
        },
        enemies: [],

        trees: [],
        stones: [],

        player: {
            survival: {
                health: 100,
                hunger: 50,
                thirst: 80,
                stamina: 100,
            },
            inventory: [
                {
                    id: 1,
                    name: "Wood",
                    amount: 0,
                },
                {
                    id: 2,
                    name: "Coconut",
                    amount: 0,
                    food: 30,
                    water: 15,
                    energy: 10
                },
                {
                    id: 3,
                    name: "Stone",
                    amount: 0,
                },
            ],
            inventoryMax: 45,
            survivalMax: 100,
            damage: 10,

            position: {
                x: 0,
                y: 0,
            },
            movementKeys: {
                w: false,
                a: false,
                s: false,
                d: false,
            },
        },
        crafting: {
            pickaxe: {
                wood: 5,
                stone: 0,
                coconut: 0,
                crafted: false,
            },
            campfire: {
                wood: 3,
                stone: 2,
                coconut: 0,
                crafted: false,
            },
            sword: {
                wood: 2,
                stone: 3,
                coconut: 0,
                crafted: false,

            },
        }
    },
}