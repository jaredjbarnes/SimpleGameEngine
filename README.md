* Make the World class have modes
    * Each mode will have its own time.
        * This is so all animation and projection will work in each mode.
* Each mode will declare which systems are used in that mode.
* Game mode will be what becomes the game.

* Have a registry of components and systems within the developer tools for gaming. We can then serialize the world config with the urls instead of aliases. This should make building systems and components easy and flexible.