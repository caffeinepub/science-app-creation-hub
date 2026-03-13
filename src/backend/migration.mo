import List "mo:core/List";
import Map "mo:core/Map";

module {
  type OldBookmark = {
    user : Principal;
    lessonId : Nat;
  };

  type OldActor = {
    categories : Map.Map<Nat, { id : Nat; name : Text; description : Text; icon : Text }>;
    lessons : Map.Map<Nat, { id : Nat; categoryId : Nat; title : Text; shortDescription : Text; content : Text; tags : [Text] }>;
    bookmarks : List.List<OldBookmark>;
  };

  type NewActor = {
    categories : Map.Map<Nat, { id : Nat; name : Text; description : Text; icon : Text }>;
    lessons : Map.Map<Nat, { id : Nat; categoryId : Nat; title : Text; shortDescription : Text; content : Text; tags : [Text] }>;
    bookmarks : List.List<{ user : Text; lessonId : Nat }>;
  };

  public func run(old : OldActor) : NewActor {
    let newBookmarks = old.bookmarks.map<OldBookmark, { user : Text; lessonId : Nat }>(
      func(oldBookmark) {
        { oldBookmark with user = oldBookmark.user.toText() };
      }
    );
    {
      old with
      bookmarks = newBookmarks
    };
  };
};
