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

        enemyTypes: {
            basic: {
                name: "Basic Enemy",
                size: 30,
                health: 50,
                damage: 15,
                speed: 1.5,
                color: "#b61818",
                attractionRange: 200,
                attackRange: 10,
                attackCooldown: 1000
            },
            fast: {
                name: "Fast Enemy",
                size: 25,
                health: 35,
                damage: 10,
                speed: 2.5,
                color: "#ff6b6b",
                attractionRange: 250,
                attackRange: 12,
                attackCooldown: 800
            },
            tank: {
                name: "Tank Enemy",
                size: 40,
                health: 100,
                damage: 20,
                speed: 1,
                color: "#8b0000",
                attractionRange: 150,
                attackRange: 15,
                attackCooldown: 1500
            }
        },

        enemySpawn: {
            spawnInterval: null,
            isSpawning: false,
            limits: {
                tank: { max: 2, current: 0 },
                fast: { max: 5, current: 0 },
                basic: { max: 10, current: 0 }
            },
            spawnDelay: 60000, // 1min
        },

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
            combat: {
                attackRange: 50,
                attackCooldown: 0,
                isAttacking: false,
                attackDamage: 15,
            }
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