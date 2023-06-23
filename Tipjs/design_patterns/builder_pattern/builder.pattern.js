class FifaOnlinePlayer {
    constructor(builder) {
        this.name = builder.name
        this.age = builder.age
        this.nationality = builder.nationality
        this.position = builder.position
        this.stats = builder.stats
    }

    toString() {
        let player = `Player:\n`;
        player += `Name: ${this.name}\n`;
        player += `Age: ${this.age}\n`;
        player += `Nationality: ${this.nationality}\n`;
        player += `Position: ${this.position}\n`;
        player += `Team: ${this.stats}\n`;
        player += `Stats: ${JSON.stringify(this.stats)}\n`;

        return player;
    }
}

class FifaOnlinePlayerBuider {
    constructor() {
        this.name = ''
        this.age = 0
        this.nationality = ''
        this.position = ''
        this.stats = {}
    }

    withName(name) {
        this.name = name

        return this
    }

    withAge(age) {
        this.age = age

        return this
    }

    withNationality(nationality) {
        this.nationality = nationality

        return this
    }


    withPosition(position) {
        this.position = position

        return this
    }


    withTeam(team) {
        this.team = team

        return this
    }


    withStats(stats) {
        this.stats = stats

        return this
    }

    build() {
        return new FifaOnlinePlayer(this)
    }
}

// use
const builderPattern =  new FifaOnlinePlayerBuider()

const cr7 = builderPattern
    .withName('Cr7')
    .withAge(38)
    .withNationality('Portugal')
    .withTeam('Al nassr')
    .withPosition('FW')
    .withStats({ goals: 15, assists: 2 })
    .build()

console.log(cr7.toString())

const m10 = builderPattern
    .withName('m10')
    .withAge(36)
    .withNationality('Portugal')
    .withTeam('Al nassr')
    .withPosition('FW')
    .withStats({ goals: 20, assists: 3 })
    .build()

console.log(m10.toString())
