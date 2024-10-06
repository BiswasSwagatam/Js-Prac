import fs from 'fs'
import {Command} from 'commander'

const program = new Command()

program
    .name('count')
    .description('CLI to do file based tasks')
    .version('1.0.0')

program.command('count')
    .description('count the number of words in a file')
    .argument('<file>', 'the file to count')
    .action((file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            } else {
                const words = data.split(' ').length
                console.log(`There are ${words} words in ${file}`)
            }
        })
    })

program.parse()