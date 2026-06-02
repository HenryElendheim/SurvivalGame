const model = {
    app: {
        app: document.getElementById("app"),
    },
    viewState: {

    },
    data: {
        missions: {
            currentMission: "Gather wood and stone",
            allMissions: ["Gather wood and stone", "Build the SOS Tower", "Place the SOS Tower", "Survive the swarm!"],
        },
        enemies: [],

        enemyTypes: {
            basic: {
                key: "basic",
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
                key: "fast",
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
                key: "tank",
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
            spawnDelay: 12000, // 12s
        },

        trees: [],
        stones: [],
        placeables: [],

        sos: {
            placed: false,
            active: false,
            x: 0,
            y: 0,
            radius: 190,
            elapsedMs: 0,
            requiredMs: 30000, // survive 30 seconds inside the bubble
            lastTick: null,
        },
        gameWon: false,
        gameOver: false,
        deaths: 0,

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