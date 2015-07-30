package solution3_1

import java.util.Random // contains Random
import jet // Adds String.toInt() and others
import kotlin.io // contains readLine()

fun main(args: Array<String>) {
    val secretNumber = Random().nextInt(101)

    println("Guess the number!")

    loop@ while (true) {
        println("Please input your guess.")
        var guess_str: String? = readLine()
        // The following uses an Elvis Operator (don't ask, I can't answer)
        // If the lhs is not null, use it. If it is, do the right hand side.
        guess_str ?: continue
        var guess: Int = try { guess_str.toInt() } catch (e: NumberFormatException) { continue }
        when (guess.compareTo(secretNumber)) {
            -1 -> println("Too small!")
            1 -> println("Too big!")
            0 -> {
                println("You win!")
                // Can't break from inside of a when; If we were elsewhere, we
                // could use break like we used continue earlier.
                break@loop
            }
            // There are no other options for .compareTo(); If there were,
            // we would add an else.
            //else -> continue@loop
        }
    }
}