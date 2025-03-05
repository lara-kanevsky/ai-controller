using BackendEvoltis.Dtos.Ai;
using BackendEvoltis.Entities;
using Sodium;

namespace BackendEvoltis.Services
{
    public class AiService
    {
        private readonly TokenEncryptionService _encryptionService;

        public AiService(
            TokenEncryptionService encryptionService)
        {
            _encryptionService = encryptionService;
        }
        public Ai SecureAiKey(NewAi newAi)
        {
            return _encryptionService.Encrypt(aiKey);
        }
    }
}
