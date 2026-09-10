'use client';


export default function ActionsSetting() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de]">
          Actions permissions
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="actions-permission" 
              defaultChecked 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Allow all actions and reusable workflows</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                Any action or reusable workflow can be used, regardless of who authored it or where it is defined.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="actions-permission" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Disable actions</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                The Actions tab is hidden and no workflows can run.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="actions-permission" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Allow odiljonovism2010 actions and reusable workflows</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                Any action or reusable workflow defined in a repository within odiljonovism2010 can be used.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="actions-permission" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Allow odiljonovism2010, and select non-odiljonovism2010, actions and reusable workflows</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                Any action or reusable workflow that matches the specified criteria, plus those defined in a repository within odiljonovism2010, can be used.{' '}
                <a href="#" className="text-[#0969da] hover:underline">Learn more about allowing specific actions and reusable workflows to run.</a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input 
              type="checkbox" 
              id="pin-sha" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] rounded cursor-pointer"
            />
            <label htmlFor="pin-sha" className="font-semibold text-sm cursor-pointer">
              Require actions to be pinned to a full-length commit SHA
            </label>
          </div>

          <div className="pt-2">
            <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#d0d7de]">
        <h3 className="text-xl font-normal mb-1">Artifact and log retention</h3>
        <p className="text-xs text-[#57606a] mb-4">Choose the repository settings for artifacts and logs.</p>
        
        <div className="space-y-2">
          <label className="block font-semibold text-sm">Artifact and log retention</label>
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              defaultValue="90" 
              className="px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md w-20 text-sm focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da]"
            />
            <span className="text-sm text-[#57606a]">days</span>
            <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer">
              Save
            </button>
          </div>
          <p className="text-xs text-[#57606a] pt-1">
            There is a maximum limit of 90 days.{' '}
            <a href="#" className="text-[#0969da] hover:underline">Learn more about the artifact and log retention policy.</a>
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-[#d0d7de]">
        <h3 className="text-xl font-normal mb-1">Approval for running fork pull request workflows from contributors</h3>
        <p className="text-xs text-[#57606a] mb-6">
          Choose which subset of users will require approval before running workflows on their pull requests. Both the pull request author and the actor of the pull request event triggering the workflow will be checked to determine if approval is required. If approval is required, a user with write access to the repository must <a href="#" className="text-[#0969da] hover:underline">approve the pull request workflow to be run.</a>
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="fork-approval" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Require approval for first-time contributors who are new to GitHub</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                Only users who are both new on GitHub and who have never had a commit or pull request merged into this repository will require approval to run workflows.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="fork-approval" 
              defaultChecked 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Require approval for first-time contributors</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                Only users who have never had a commit or pull request merged into this repository will require approval to run workflows.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="radio" 
              name="fork-approval" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
            />
            <div>
              <label className="font-semibold text-sm cursor-pointer">Require approval for all external contributors</label>
              <p className="text-xs text-[#57606a] mt-0.5">
                All users that are not a member or owner of this repository will require approval to run workflows.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>
      <div>
      <h2 className="text-2xl font-normal pb-4 border-b border-[#d0d7de]">
        Workflow permissions
      </h2>

      <div className="mt-6 space-y-4">
        <p className="text-xs text-[#57606a] leading-relaxed">
          Choose the default permissions granted to the GITHUB_TOKEN when running workflows in this repository. You can specify more granular permissions in the workflow using YAML.{' '}
          <a href="#" className="text-[#0969da] hover:underline">Learn more about managing permissions.</a>
        </p>

        <div className="flex items-start gap-3 pt-2">
          <input 
            type="radio" 
            name="workflow-permission" 
            className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
          />
          <div>
            <label className="font-semibold text-sm cursor-pointer">Read and write permissions</label>
            <p className="text-xs text-[#57606a] mt-0.5">
              Workflows have read and write permissions in the repository for all scopes.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input 
            type="radio" 
            name="workflow-permission" 
            defaultChecked 
            className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] cursor-pointer"
          />
          <div>
            <label className="font-semibold text-sm cursor-pointer">Read repository contents and packages permissions</label>
            <p className="text-xs text-[#57606a] mt-0.5">
              Workflows have read permissions in the repository for the contents and packages scopes only.
            </p>
          </div>
        </div>

        <div className="pt-3">
          <p className="text-xs text-[#57606a] mb-3">
            Choose whether GitHub Actions can create pull requests or submit approving pull request reviews.
          </p>
          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="create-approve-pr" 
              className="mt-1 w-4 h-4 accent-[#0969da] border-[#d0d7de] rounded cursor-pointer"
            />
            <label htmlFor="create-approve-pr" className="font-semibold text-sm cursor-pointer">
              Allow GitHub Actions to create and approve pull requests
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button className="px-4 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md font-medium text-sm hover:bg-[#f3f4f6] active:bg-[#edeff2] transition-colors cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}