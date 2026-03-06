import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    serviceType : Text;
  };

  let inquiries = Map.empty<Text, Inquiry>();

  public shared ({ caller }) func submitInquiry(id : Text, name : Text, email : Text, phone : Text, message : Text, serviceType : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      message;
      serviceType;
    };
    inquiries.add(id, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  public query ({ caller }) func getInquiry(id : Text) : async ?Inquiry {
    switch (inquiries.get(id)) {
      case (null) { null };
      case (?inquiry) { ?inquiry };
    };
  };

  public query ({ caller }) func getTotalInquiriesCount() : async Nat {
    inquiries.size();
  };

  public query ({ caller }) func getInquiriesByServiceType(serviceType : Text) : async [Inquiry] {
    let filtered = inquiries.values().filter(
      func(inquiry) {
        inquiry.serviceType == serviceType;
      }
    );
    filtered.toArray();
  };
};
