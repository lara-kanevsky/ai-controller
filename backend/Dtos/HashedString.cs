using Sodium;

namespace BackendEvoltis.Dtos
{
    public readonly record struct HashedString
    {
        public string Value { get; }
        private HashedString(string value) => Value = value;
        public override string ToString() => Value;

        public static implicit operator string(HashedString hashed) => hashed.Value;
        public static HashedString FromRawString(string rawPassword)
        {
            string hashed = PasswordHash.ArgonHashString(rawPassword, PasswordHash.StrengthArgon.Medium);
            return new HashedString(hashed);
        }
        public static bool Verify(this string value,string input)
        {
            return PasswordHash.ArgonHashStringVerify(value, input);
        }
    }


}
