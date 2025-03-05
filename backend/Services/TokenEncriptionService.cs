using System.Security.Cryptography;
using System.Text;

public class TokenEncryptionService
{
    private readonly byte[] _encryptionKey;

    public TokenEncryptionService(IConfiguration configuration)
    {
        // Retrieve encryption key from secure configuration
        _encryptionKey = DeriveKey(configuration["EncryptionSettings:MasterKey"]);
    }

    // Derive a secure encryption key
    private byte[] DeriveKey(string masterKey, int keyLength = 32)
    {
        using (var deriveBytes = new Rfc2898DeriveBytes(
            masterKey,
            Encoding.UTF8.GetBytes("PermanentSalt"),
            iterations: 10000,
            HashAlgorithmName.SHA256))
        {
            return deriveBytes.GetBytes(keyLength);
        }
    }

    // Encrypt token
    public (string EncryptedToken, string IV) Encrypt(string token)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = _encryptionKey;
            aesAlg.GenerateIV();

            using (var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV))
            {
                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    using (var swEncrypt = new StreamWriter(csEncrypt))
                    {
                        swEncrypt.Write(token);
                    }

                    var encryptedBytes = msEncrypt.ToArray();
                    return (
                        Convert.ToBase64String(encryptedBytes),
                        Convert.ToBase64String(aesAlg.IV)
                    );
                }
            }
        }
    }

    // Decrypt token
    public string Decrypt(string encryptedToken, string iv)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = _encryptionKey;
            aesAlg.IV = Convert.FromBase64String(iv);

            using (var decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV))
            {
                using (var msDecrypt = new MemoryStream(Convert.FromBase64String(encryptedToken)))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    using (var srDecrypt = new StreamReader(csDecrypt))
                    {
                        return srDecrypt.ReadToEnd();
                    }
                }
            }
        }
    }
}