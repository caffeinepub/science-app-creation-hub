import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

// Use migration to preserve data on upgrades
(with migration = Migration.run)
actor {
  // Data Types
  public type Category = {
    id : Nat;
    name : Text;
    description : Text;
    icon : Text;
  };

  public type Lesson = {
    id : Nat;
    categoryId : Nat;
    title : Text;
    shortDescription : Text;
    content : Text;
    tags : [Text];
  };

  public type Bookmark = {
    user : Text;
    lessonId : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  // State Variables
  let categories = Map.empty<Nat, Category>();
  let lessons = Map.empty<Nat, Lesson>();
  let bookmarks = List.empty<Bookmark>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Initialization Functions
  public shared ({ caller }) func initializeSeedData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can initialize seed data");
    };

    if (categories.size() > 0) { Runtime.trap("Seed data already initialized") };

    // Categories
    categories.add(
      1,
      {
        id = 1;
        name = "Science";
        description = "Explore physics, chemistry, biology, and more!";
        icon = "🔬";
      },
    );

    categories.add(
      2,
      {
        id = 2;
        name = "App Creation";
        description = "Learn how to build apps from scratch.";
        icon = "💻";
      },
    );

    // Science Lessons
    lessons.add(
      1,
      {
        id = 1;
        categoryId = 1;
        title = "Introduction to Physics";
        shortDescription = "Learn the basics of physics, including motion, forces, and energy.";
        content = "Physics is the study of matter, energy, and the interactions between them. Key concepts include Newton's Laws of Motion, the principles of energy conservation, and the behavior of waves. Understanding physics helps us explain how the world works, from the movement of planets to the smallest particles of matter.";
        tags = ["Physics", "Science"];
      },
    );

    lessons.add(
      2,
      {
        id = 2;
        categoryId = 1;
        title = "Basics of Chemistry";
        shortDescription = "Understand fundamental chemical concepts and reactions.";
        content = "Chemistry focuses on the composition, structure, and properties of substances. Fundamental topics include atomic structure, chemical bonds, reactions, and the periodic table. Knowledge of chemistry is essential in fields such as medicine, engineering, and environmental science.";
        tags = ["Chemistry", "Science"];
      },
    );

    lessons.add(
      3,
      {
        id = 3;
        categoryId = 1;
        title = "Biology 101";
        shortDescription = "Explore the basics of living organisms and life processes.";
        content = "Biology examines the structure, function, growth, and evolution of living organisms. Key concepts include cell theory, genetics, ecology, and evolution. Studying biology provides insights into the diversity of life on Earth and the mechanisms that sustain it.";
        tags = ["Biology", "Science"];
      },
    );

    lessons.add(
      4,
      {
        id = 4;
        categoryId = 1;
        title = "Earth Science Essentials";
        shortDescription = "Discover the fundamentals of geology, meteorology, and astronomy.";
        content = "Earth Science covers the physical characteristics and processes of our planet and the universe. Topics include geology, meteorology, oceanography, and astronomy. Understanding Earth Science helps us address environmental challenges and explore space.";
        tags = ["Earth Science", "Science"];
      },
    );

    // App Creation Lessons
    lessons.add(
      5,
      {
        id = 5;
        categoryId = 2;
        title = "Introduction to App Development";
        shortDescription = "Learn the basics of creating software applications.";
        content = "App Development involves designing, building, and maintaining software for various platforms. Key steps include planning, coding, testing, and deployment. Understanding the software development lifecycle is essential for creating successful applications.";
        tags = ["Development", "Apps"];
      },
    );

    lessons.add(
      6,
      {
        id = 6;
        categoryId = 2;
        title = "Programming Fundamentals";
        shortDescription = "Grasp essential programming concepts for app creation.";
        content = "Programming involves writing instructions for computers using languages like Python, Java, or JavaScript. Fundamental concepts include variables, control structures, data types, and algorithms. Mastering these basics lays the foundation for app development.";
        tags = ["Programming", "Apps"];
      },
    );

    lessons.add(
      7,
      {
        id = 7;
        categoryId = 2;
        title = "User Interface Design";
        shortDescription = "Learn how to create intuitive and appealing user interfaces.";
        content = "UI Design focuses on creating user-friendly and visually appealing interfaces. Key principles include layout, color theory, typography, and usability. Good UI design enhances user experience and satisfaction with digital products.";
        tags = ["UI Design", "Apps"];
      },
    );

    lessons.add(
      8,
      {
        id = 8;
        categoryId = 2;
        title = "App Deployment";
        shortDescription = "Understand how to launch and maintain apps in the real world.";
        content = "App Deployment involves preparing software for release and ensuring its ongoing performance. Steps include packaging, distribution, monitoring, and updates. Effective deployment practices ensure that apps run smoothly and reach their intended audience.";
        tags = ["Deployment", "Apps"];
      },
    );
  };

  // Public Functions - Read operations (accessible to all including guests)
  public query ({ caller }) func getCategories() : async [Category] {
    categories.values().toArray();
  };

  public query ({ caller }) func getLessonsByCategory(categoryId : Nat) : async [Lesson] {
    lessons.values().toArray().filter(func(l) { l.categoryId == categoryId });
  };

  public query ({ caller }) func getLessonById(lessonId : Nat) : async ?Lesson {
    lessons.get(lessonId);
  };

  public query ({ caller }) func searchLessons(keyword : Text) : async [Lesson] {
    lessons.values().toArray().filter(
      func(l) { l.title.contains(#text keyword) or l.shortDescription.contains(#text keyword) }
    );
  };

  // Bookmark Management - User must be authenticated and can only manage their own bookmarks
  public shared ({ caller }) func addBookmark(lessonId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add bookmarks");
    };

    switch (lessons.get(lessonId)) {
      case (null) { Runtime.trap("Lesson does not exist") };
      case (?_) {};
    };

    let userText = caller.toText();
    let existing = bookmarks.toArray().filter(
      func(b) { b.user == userText and b.lessonId == lessonId }
    );
    if (existing.size() > 0) { Runtime.trap("Bookmark already exists") };

    let newBookmark = {
      user = userText;
      lessonId;
    };
    bookmarks.add(newBookmark);
  };

  public shared ({ caller }) func removeBookmark(lessonId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can remove bookmarks");
    };

    let userText = caller.toText();
    let filteredBookmarks = bookmarks.toArray().filter(
      func(b) { not (b.user == userText and b.lessonId == lessonId) }
    );
    bookmarks.clear();
    bookmarks.addAll(filteredBookmarks.values());
  };

  public query ({ caller }) func getBookmarkedLessonIds() : async [Nat] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view bookmarks");
    };

    let userText = caller.toText();
    let userBookmarks = bookmarks.toArray().filter(func(b) { b.user == userText });
    userBookmarks.map(func(b) { b.lessonId });
  };

  // Admin function to view any user's bookmarks
  public query ({ caller }) func getUserBookmarks(user : Text) : async [Nat] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view other users' bookmarks");
    };

    let userBookmarks = bookmarks.toArray().filter(func(b) { b.user == user });
    userBookmarks.map(func(b) { b.lessonId });
  };
};
