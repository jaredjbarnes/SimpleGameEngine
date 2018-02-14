## Random Thoughts

Should system data be saved as an entity in the world, and this becomes the mode of communication between systems.
We found this need within the collision system, to optimize the rendering because the collision system already finds
entities that have moved and divides the world into quadrants or cells to optimize the comparisons to other objects. 

This is also an idea that we could use with in the dyamic camera which uses entities to detect the entities it needs to render. 

* Is this really just glorified global data? 
* What are the consequences of this type of architecture?
* Do we want to allow for systems to change eachothers data?
* Do we use getter and setters to protect against systems changing data they shouldn't?
* Does immutable data fix this?

BroadphaseCollision should be done on the main thread because the camera needs to know about that data any way. But we should use web workers for NarrowPhaseCollisions and other intense computation like world building.

* Change the CameraCanvasCellSystem to actually be DynamicLoadingSystem, then we could use that functionality with multiple other systems. Like dynamically generating terrain.

* What if we made all systems async so that web workers are used with in every system? All lifecycle events would be async.

* What if we made it possible to have systems that are sync and others that are async.