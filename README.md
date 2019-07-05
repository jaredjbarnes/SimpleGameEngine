* Make the World class have modes
    * Each mode will have its own time.
        * This is so all animation and projection will work in each mode.
* Each mode will declare which systems are used in that mode.
* Game mode will be what becomes the game.

* Make a serialize and deserialize method on both systems and components.
* Make components and systems have a getSchema method to know how to configure.
* Make a world loader that works with the current release tag on the repo.